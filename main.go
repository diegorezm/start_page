package main

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

//go:embed out/*
var assets embed.FS

func getContentType(filePath string) string {
	ext := strings.ToLower(filepath.Ext(filePath))
	switch ext {
	case ".js":
		return "application/javascript"
	case ".css":
		return "text/css"
	case ".html":
		return "text/html"
	case ".json":
		return "application/json"
	case ".jpg", ".jpeg":
		return "image/jpeg"
	case ".png":
		return "image/png"
	case ".gif":
		return "image/gif"
	case ".svg":
		return "image/svg+xml"
	default:
		return "application/octet-stream"
	}
}

func serveStatic(w http.ResponseWriter, r *http.Request) {
	var filePath string

	requestPath := r.URL.Path

	if requestPath == "/" {
		filePath = "index.html"
	} else {
		filePath = strings.Replace(requestPath, "/", "", 1)
	}

	contentType := getContentType(filePath)

	fullPath := fmt.Sprintf("out/%s", filePath)

	file, err := assets.Open(fullPath)

	if err != nil {
		http.Error(w, "File does not exist.", 404)
		return
	}

	defer file.Close()

	fileInfo, err := file.Stat()

	if err != nil {
		http.Error(w, "Unable to get file information.", 500)
		return
	}

	bytes := make([]byte, fileInfo.Size())

	_, err = file.Read(bytes)

	if err != nil {
		log.Printf("Error: %v", err)
		http.Error(w, "Something went wrong.", 500)
		return
	}
	w.Header().Set("Content-Type", contentType)
	w.Write(bytes)
}

func main() {
	mux := http.NewServeMux()
	port := ":3435"
	mux.HandleFunc("GET /", serveStatic)
	log.Printf("Listening on http://localhost%s", port)

	log.Fatal(http.ListenAndServe(port, mux))
}
