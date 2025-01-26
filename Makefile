build:
	@pnpm run build
	@go build -o bin/start_page

build-window:
	@pnpm run build
	@GOOS=windows GOARCH=amd64 go build -o bin/start_page.exe
	

install: build
	@cp ./bin/start_page $$HOME/.local/bin


