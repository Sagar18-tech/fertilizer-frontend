<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-card">
        <div class="logo-section">
          <div class="logo">
            <i class="fas fa-seedling"></i>
          </div>
          <h1 class="app-title">Join Fertilizer Advisor</h1>
          <p class="subtitle">Create your account to get personalized fertilizer recommendations.</p>
        </div>

        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="input-group">
            <label for="username" class="input-label">Username</label>
            <div class="input-wrapper">
              <i class="fas fa-user-plus input-icon"></i>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Choose a username"
                class="form-input"
                :class="{ 'input-error': error && !username }"
              />
            </div>
          </div>

          <div class="input-group">
            <label for="password" class="input-label">Password</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Create a strong password"
                class="form-input"
                :class="{ 'input-error': error && !password }"
              />
            </div>
          </div>

          <button
            type="submit"
            class="signup-btn"
            :disabled="loading"
            :class="{ 'btn-loading': loading }"
          >
            <span v-if="!loading">Create Account</span>
            <span v-else class="loading-text">
              <i class="fas fa-spinner fa-spin"></i>
              Creating account...
            </span>
          </button>
        </form>

        <div v-if="error" class="alert alert-error">
          <i class="fas fa-exclamation-triangle"></i>
          {{ error }}
        </div>

        <div v-if="success" class="alert alert-success">
          <i class="fas fa-check-circle"></i>
          {{ success }}
        </div>

        <div class="auth-links">
          <p class="auth-link">
            Already have an account?
            <router-link to="/login" class="link">Sign in here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signup } from "../services/auth.js";

export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      success: "",
      loading: false
    };
  },
  methods: {
    async handleSignup() {
      if (!this.username || !this.password) {
        this.error = "Please enter all fields";
        return;
      }
      this.loading = true;
      this.error = "";
      this.success = "";
      try {
        await signup(this.username, this.password);
        this.success = "Signup successful! You can now login.";
      } catch (err) {
        this.error = err.error || "Signup failed";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.signup-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.15)"/><circle cx="70" cy="50" r="1.5" fill="rgba(255,255,255,0.15)"/><circle cx="50" cy="70" r="1" fill="rgba(255,255,255,0.15)"/><circle cx="20" cy="60" r="1.5" fill="rgba(255,255,255,0.15)"/><circle cx="80" cy="20" r="1" fill="rgba(255,255,255,0.15)"/><circle cx="10" cy="80" r="1.2" fill="rgba(255,255,255,0.15)"/></svg>');
  animation: float 25s ease-in-out infinite;
}

.signup-container {
  width: 100%;
  max-width: 450px;
  animation: slideIn 0.6s ease-out;
}

.signup-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.8s ease-out;
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
  animation: bounceIn 1s ease-out;
}

.logo i {
  font-size: 32px;
  color: white;
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
}

.signup-form {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 25px;
}

.input-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  transition: color 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #f5576c;
  background: white;
  box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
  transform: translateY(-2px);
}

.form-input:hover {
  border-color: #f5576c;
}

.input-error {
  border-color: #e74c3c;
  animation: shake 0.5s ease-in-out;
}

.signup-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
  position: relative;
  overflow: hidden;
}

.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
}

.signup-btn:active:not(:disabled) {
  transform: translateY(0);
}

.signup-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-loading {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  animation: slideInFromTop 0.4s ease-out;
}

.alert-error {
  background: #fee;
  color: #e74c3c;
  border: 1px solid #fcd0d0;
}

.alert-success {
  background: #efe;
  color: #27ae60;
  border: 1px solid #d5f4e6;
}

.auth-links {
  text-align: center;
  margin-top: 25px;
}

.auth-link {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.link {
  color: #f5576c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link:hover {
  color: #f093fb;
  text-decoration: underline;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(-1deg);
  }
  50% {
    transform: translateY(-25px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(1deg);
  }
}

/* Responsive Design */
@media (max-width: 480px) {
  .signup-card {
    padding: 30px 20px;
    margin: 10px;
  }

  .app-title {
    font-size: 24px;
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  .logo i {
    font-size: 24px;
  }
}
</style>
