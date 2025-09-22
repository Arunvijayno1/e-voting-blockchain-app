import { registerUser, loginUser } from "./api.js";

async function testAuth() {
  try {
    // Example: Register
    const res1 = await registerUser("john", "john@gmail.com", "12345");
    console.log("Register response:", res1);

    // Example: Login
    const res2 = await loginUser("john@gmail.com", "12345");
    console.log("Login response:", res2);

  } catch (err) {
    console.error("Error:", err);
  }
}

testAuth();
