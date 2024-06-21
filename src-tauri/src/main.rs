// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::prelude::*;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn install(path: String, handle: tauri::AppHandle) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("resources/test.txt")
        .expect("failed to resolve resource");
    println!("Path: {}", path);

    let mut src_file = File::open(resource_path).expect("Unable to open source file");
    let mut buffer = Vec::new();
    src_file
        .read_to_end(&mut buffer)
        .expect("Unable to read source file");

    let mut dst_file = File::create(path + "/test.txt").expect("Unable to create file");
    dst_file
        .write_all(&buffer)
        .expect("Unable to write destination file");

    "File copied successfully".to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![install])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
