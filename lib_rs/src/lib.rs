use photon_rs::{monochrome::grayscale, native::open_image_from_bytes};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn image_to_grayscale(data: &[u8]) -> String {
    let Ok(mut image) = open_image_from_bytes(data) else {
        return String::new();
    };
    grayscale(&mut image);
    image.get_base64()
}
