#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;

fn main() {
  tauri::AppBuilder::new()
    .invoke_handler(|_webview, arg| {
      use cmd::Cmd::*;
      match serde_json::from_str(arg) {
        Err(e) => {
          Err(e.to_string())
        }
        Ok(command) => {
          match command {
            ConfigDir { callback, error } => {
              tauri::execute_promise_sync(_webview, move || {
                Ok(tauri::api::path::app_dir().unwrap().into_os_string().into_string().unwrap())
              }, callback, error);
            }
          }
          Ok(())
        }
      }
    })
    .build()
    .run();
}
