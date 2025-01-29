# Variables
BIN_DIR := bin
BINARY_NAME := start_page
LOCAL_BIN := $$HOME/.local/bin
NODE_BUILD := pnpm run build
GO_BUILD := go build -o $(BIN_DIR)/$(BINARY_NAME)

# Targets
.PHONY: all build build-window install clean

all: build

build:
	@$(NODE_BUILD) && $(GO_BUILD)

build-window:
	@$(NODE_BUILD) && GOOS=windows GOARCH=amd64 $(GO_BUILD).exe

install: build
	@killall $(BINARY_NAME) || true
	@rm -f $(LOCAL_BIN)/$(BINARY_NAME)
	@cp $(BIN_DIR)/$(BINARY_NAME) $(LOCAL_BIN)

clean:
	@rm -f $(BIN_DIR)/$(BINARY_NAME) $(BIN_DIR)/$(BINARY_NAME).exe
