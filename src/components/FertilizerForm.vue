<template>
  <div class="fertilizer-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo">
            <i class="fas fa-seedling"></i>
          </div>
          <div class="title-section">
            <h1 class="main-title">Smart Fertilizer Advisor</h1>
            <p class="subtitle">AI-powered recommendations for optimal crop nutrition</p>
          </div>
        </div>
        <div class="user-info">
          <span>Welcome, {{ username }}</span>
        </div>
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="form-card">
        <!-- Progress Indicator -->
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-icon">
                <i class="fas fa-leaf"></i>
              </div>
              <span class="step-label">Crop</span>
            </div>
            <div class="progress-line" :class="{ active: currentStep > 1 }"></div>
            <div class="progress-step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-icon">
                <i class="fas fa-flask"></i>
              </div>
              <span class="step-label">Soil</span>
            </div>
            <div class="progress-line" :class="{ active: currentStep > 2 }"></div>
            <div class="progress-step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
              <div class="step-icon">
                <i class="fas fa-brain"></i>
              </div>
              <span class="step-label">Analysis</span>
            </div>
          </div>
        </div>

        <!-- Form Section -->
        <form @submit.prevent="submitForm" class="fertilizer-form">
          <!-- Step 1: Crop Selection -->
          <div v-show="currentStep === 1" class="form-step" key="step1">
            <div class="step-header">
              <h3 class="step-title">
                <i class="fas fa-leaf step-icon"></i>
                Select Your Crop
              </h3>
              <p class="step-description">Choose the crop you want to optimize</p>
            </div>

            <div class="crop-selection">
              <div class="crop-grid">
                <div
                  v-for="cropOption in cropOptions"
                  :key="cropOption.value"
                  class="crop-card"
                  :class="{ selected: crop === cropOption.value }"
                  @click="selectCrop(cropOption.value)"
                >
                  <div class="crop-icon">
                    <i :class="cropOption.icon"></i>
                  </div>
                  <div class="crop-info">
                    <h4 class="crop-name">{{ cropOption.name }}</h4>
                    <p class="crop-desc">{{ cropOption.description }}</p>
                  </div>
                </div>
              </div>

              <div class="custom-crop">
                <label class="input-label">Or enter custom crop:</label>
                <div class="input-wrapper">
                  <i class="fas fa-search input-icon"></i>
                  <input
                    v-model="crop"
                    type="text"
                    placeholder="Enter crop name..."
                    class="custom-input"
                    @input="handleCustomCrop"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Soil Parameters -->
          <div v-show="currentStep === 2" class="form-step" key="step2">
            <div class="step-header">
              <h3 class="step-title">
                <i class="fas fa-flask step-icon"></i>
                Soil Nutrient Levels
              </h3>
              <p class="step-description">Enter your soil test results (NPK values)</p>
            </div>

            <div class="nutrient-inputs">
              <div class="nutrient-group">
                <div class="nutrient-card nitrogen">
                  <div class="nutrient-header">
                    <div class="nutrient-icon">
                      <i class="fas fa-atom"></i>
                    </div>
                    <div class="nutrient-info">
                      <h4>Nitrogen (N)</h4>
                      <p>Essential for plant growth</p>
                    </div>
                  </div>
                  <div class="input-wrapper">
                    <input
                      type="number"
                      v-model.number="n"
                      placeholder="0"
                      min="0"
                      max="200"
                      step="0.1"
                      class="nutrient-input"
                      required
                    />
                    <span class="unit">kg/ha</span>
                  </div>
                </div>

                <div class="nutrient-card phosphorus">
                  <div class="nutrient-header">
                    <div class="nutrient-icon">
                      <i class="fas fa-fire"></i>
                    </div>
                    <div class="nutrient-info">
                      <h4>Phosphorus (P)</h4>
                      <p>Root development & flowering</p>
                    </div>
                  </div>
                  <div class="input-wrapper">
                    <input
                      type="number"
                      v-model.number="p"
                      placeholder="0"
                      min="0"
                      max="200"
                      step="0.1"
                      class="nutrient-input"
                      required
                    />
                    <span class="unit">kg/ha</span>
                  </div>
                </div>

                <div class="nutrient-card potassium">
                  <div class="nutrient-header">
                    <div class="nutrient-icon">
                      <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="nutrient-info">
                      <h4>Potassium (K)</h4>
                      <p>Disease resistance & quality</p>
                    </div>
                  </div>
                  <div class="input-wrapper">
                    <input
                      type="number"
                      v-model.number="k"
                      placeholder="0"
                      min="0"
                      max="200"
                      step="0.1"
                      class="nutrient-input"
                      required
                    />
                    <span class="unit">kg/ha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Analysis & Results -->
          <div v-show="currentStep === 3" class="form-step" key="step3">
            <div class="step-header">
              <h3 class="step-title">
                <i class="fas fa-brain step-icon"></i>
                AI Analysis
              </h3>
              <p class="step-description">Our ML model is analyzing your data...</p>
            </div>

            <div class="analysis-section">
              <div class="analysis-summary">
          <div class="summary-item">
            <i :class="getCropIconClass(crop)"></i>
            <span><strong>Crop:</strong> {{ crop }}</span>
          </div>
          <div class="summary-item">
            <i class="fas fa-chart-line"></i>
            <span><strong>NPK Levels:</strong> {{ n }} - {{ p }} - {{ k }}</span>
          </div>
              </div>

              <div v-if="!loading && !recommendation && !error" class="ready-message">
                <i class="fas fa-check-circle"></i>
                <p>Ready to analyze! Click the button below to get your personalized fertilizer recommendation.</p>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="form-navigation">
            <button
              type="button"
              @click="previousStep"
              class="nav-btn secondary"
              :disabled="currentStep === 1"
              v-show="currentStep > 1"
            >
              <i class="fas fa-arrow-left"></i>
              Previous
            </button>

            <button
              type="button"
              @click="nextStep"
              class="nav-btn primary"
              :disabled="!canProceed"
              v-show="currentStep < 3"
            >
              Next
              <i class="fas fa-arrow-right"></i>
            </button>

            <button
              type="submit"
              class="nav-btn analyze"
              :disabled="loading || !canProceed"
              v-show="currentStep === 3"
            >
              <span v-if="loading" class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                Analyzing...
              </span>
              <span v-else>
                <i class="fas fa-magic"></i>
                Get Recommendation
              </span>
            </button>
          </div>
        </form>

        <!-- Results Section -->
        <transition name="resultSlide">
          <div v-if="recommendation" class="results-section">
            <div class="result-card success">
              <div class="result-header">
                <div class="result-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="result-title">Recommendation Ready!</h3>
              </div>
              <div class="result-content">
                <div class="recommendation-box">
                  <h4>Recommended Fertilizer:</h4>
                  <div class="fertilizer-name">{{ recommendation }}</div>
                </div>
                <div class="result-actions">
                  <button @click="resetForm" class="action-btn secondary">
                    <i class="fas fa-redo"></i>
                    New Analysis
                  </button>
                  <button @click="shareResult" class="action-btn primary">
                    <i class="fas fa-share"></i>
                    Share Result
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Error Section -->
        <transition name="errorShake">
          <div v-if="error" class="results-section">
            <div class="result-card error">
              <div class="result-header">
                <div class="result-icon">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="result-title">Analysis Failed</h3>
              </div>
              <div class="result-content">
                <p class="error-message">{{ error }}</p>
                <button @click="resetForm" class="action-btn retry">
                  <i class="fas fa-redo"></i>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, getCurrentUser } from "../services/auth.js";

export default {
  name: "FertilizerForm",
  data() {
    return {
      crop: "",
      n: null,
      p: null,
      k: null,
      recommendation: "",
      error: "",
      loading: false,
      currentStep: 1,
      cropOptions: [
        {
          name: "Wheat",
          value: "Wheat",
          icon: "fas fa-wheat-awn",
          description: "Winter cereal grain"
        },
        {
          name: "Rice",
          value: "Rice",
          icon: "fas fa-seedling",
          description: "Staple food crop"
        },
        {
          name: "Maize",
          value: "Maize",
          icon: "fas fa-corn",
          description: "Corn crop"
        },
        {
          name: "Sugarcane",
          value: "Sugarcane",
          icon: "fas fa-candy-cane",
          description: "Sugar producing crop"
        }
      ]
    };
  },
  computed: {
    username() {
      return getCurrentUser();
    },
    canProceed() {
      switch (this.currentStep) {
        case 1:
          return this.crop.trim() !== "";
        case 2:
          return this.n !== null && this.p !== null && this.k !== null &&
                 this.n >= 0 && this.p >= 0 && this.k >= 0;
        case 3:
          return true;
        default:
          return false;
      }
    }
  },
  methods: {
    logout() {
      logout();
      this.$router.push("/login");
    },

    selectCrop(cropValue) {
      this.crop = cropValue;
    },

    handleCustomCrop() {
      // Clear selection when user types custom crop
      // This method is called when user types in custom crop field
      // The crop value is already bound to the input, so no additional logic needed
    },

    nextStep() {
      if (this.canProceed && this.currentStep < 3) {
        this.currentStep++;
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    async submitForm() {
      this.recommendation = "";
      this.error = "";
      this.loading = true;

      try {
        const response = await fetch("https://fertilizer-recommendation-ay9m.onrender.com/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    crop: this.crop,
    N: this.n,
    P: this.p,
    K: this.k
  })
});

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        this.recommendation = data.fertilizer; // ✅ ML backend returns { fertilizer: "..." }
      } catch (err) {
        this.error = "Error fetching recommendation: " + err.message;
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.crop = "";
      this.n = null;
      this.p = null;
      this.k = null;
      this.recommendation = "";
      this.error = "";
      this.loading = false;
      this.currentStep = 1;
    },

    shareResult() {
      const shareText = `🌱 Fertilizer Recommendation for ${this.crop}:\n\n` +
                       `📊 NPK Levels: ${this.n} - ${this.p} - ${this.k}\n` +
                       `💡 Recommended: ${this.recommendation}\n\n` +
                       `Generated by Smart Fertilizer Advisor`;

      if (navigator.share) {
        navigator.share({
          title: 'Fertilizer Recommendation',
          text: shareText
        });
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Recommendation copied to clipboard!');
        });
      }
    },

    getCropIconClass(cropName) {
      const crop = this.cropOptions.find(c => c.value.toLowerCase() === cropName.toLowerCase());
      if (crop) {
        return crop.icon;
      }
      // Default icon if no match
      return 'fas fa-seedling';
    }
  }
};
</script>

<style scoped>
/* Global Styles */
.fertilizer-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin: 0 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
  animation: pulse 2s infinite;
}

.logo i {
  font-size: 28px;
  color: white;
}

.title-section h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  margin: 5px 0 0 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 400;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Main Content */
.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Progress Bar */
.progress-section {
  margin-bottom: 40px;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.progress-step.active {
  opacity: 1;
}

.progress-step.completed {
  opacity: 1;
}

.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
  transition: all 0.3s ease;
}

.progress-step.active .step-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.1);
}

.progress-step.completed .step-icon {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.step-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-line {
  width: 80px;
  height: 3px;
  background: #e0e0e0;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.progress-line.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Form Steps */
.form-step {
  animation: fadeInUp 0.6s ease-out;
}

.step-header {
  text-align: center;
  margin-bottom: 30px;
}

.step-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.step-icon {
  color: #667eea;
}

.step-description {
  color: #666;
  font-size: 16px;
  margin: 0;
}

/* Crop Selection */
.crop-selection {
  margin-bottom: 30px;
}

.crop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.crop-card {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.crop-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.crop-card.selected {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.crop-icon {
  font-size: 32px;
  color: #667eea;
  margin-bottom: 12px;
}

.crop-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.crop-desc {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.custom-crop {
  margin-top: 20px;
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
}

.custom-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.custom-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Nutrient Inputs */
.nutrient-inputs {
  margin-bottom: 30px;
}

.nutrient-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.nutrient-card {
  padding: 25px;
  border-radius: 16px;
  background: white;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.nutrient-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.nutrient-card.nitrogen {
  border-color: #4CAF50;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(69, 160, 73, 0.05));
}

.nutrient-card.phosphorus {
  border-color: #FF9800;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.05), rgba(245, 124, 0, 0.05));
}

.nutrient-card.potassium {
  border-color: #9C27B0;
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.05), rgba(142, 36, 170, 0.05));
}

.nutrient-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.nutrient-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.nutrient-card.nitrogen .nutrient-icon {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.nutrient-card.phosphorus .nutrient-icon {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
}

.nutrient-card.potassium .nutrient-icon {
  background: linear-gradient(135deg, #9C27B0, #8E24AA);
  color: white;
}

.nutrient-info h4 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.nutrient-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.nutrient-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.nutrient-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.unit {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-weight: 600;
}

/* Analysis Section */
.analysis-section {
  text-align: center;
  margin-bottom: 30px;
}

.analysis-summary {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.summary-item i {
  color: #667eea;
  font-size: 18px;
}

.ready-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  border-radius: 12px;
  color: #2e7d32;
  font-weight: 500;
}

.ready-message i {
  font-size: 24px;
  color: #4CAF50;
}

/* Navigation Buttons */
.form-navigation {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 40px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;
}

.nav-btn.secondary {
  background: #f5f5f5;
  color: #666;
  border: 2px solid #e0e0e0;
}

.nav-btn.secondary:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.nav-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.nav-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.nav-btn.analyze {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  min-width: 200px;
}

.nav-btn.analyze:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Results Section */
.results-section {
  margin-top: 30px;
}

.result-card {
  padding: 30px;
  border-radius: 16px;
  text-align: center;
}

.result-card.success {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  border: 2px solid #4CAF50;
}

.result-card.error {
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  border: 2px solid #f44336;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.result-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.result-card.success .result-icon {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.result-card.error .result-icon {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
}

.result-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.result-content {
  max-width: 600px;
  margin: 0 auto;
}

.recommendation-box {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.recommendation-box h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.fertilizer-name {
  font-size: 28px;
  font-weight: 700;
  color: #4CAF50;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.result-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.secondary {
  background: #f5f5f5;
  color: #666;
  border: 2px solid #e0e0e0;
}

.action-btn.secondary:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.action-btn.retry {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.action-btn.retry:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(244, 67, 54, 0.4);
}

.error-message {
  color: #c62828;
  font-size: 16px;
  margin-bottom: 20px;
}

/* Animations */
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.resultSlide-enter-active {
  animation: slideInFromBottom 0.6s ease-out;
}

.resultSlide-leave-active {
  animation: slideInFromBottom 0.6s reverse;
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.errorShake-enter-active {
  animation: shake 0.5s ease-in-out;
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

/* Responsive Design */

/* Large screens (desktops) */
@media (min-width: 1200px) {
  .main-content {
    max-width: 1200px;
  }

  .form-card {
    padding: 3rem;
  }

  .crop-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .nutrient-group {
    grid-template-columns: repeat(3, 1fr);
  }

  .title-section h1 {
    font-size: 2rem;
  }
}

/* Medium screens (tablets landscape) */
@media (max-width: 1024px) {
  .crop-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .nutrient-group {
    grid-template-columns: repeat(2, 1fr);
  }

  .analysis-summary {
    gap: 1.5rem;
  }
}

/* Small screens (tablets portrait and small laptops) */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1.25rem;
    text-align: center;
  }

  .user-info {
    margin: 0;
  }

  .title-section h1 {
    font-size: 1.5rem;
  }

  .logo {
    width: 3.75rem;
    height: 3.75rem;
  }

  .logo i {
    font-size: 1.75rem;
  }

  .form-card {
    padding: 1.5625rem 1.25rem;
    margin: 0 1rem;
  }

  .progress-bar {
    flex-direction: column;
    gap: 0.625rem;
  }

  .progress-line {
    width: 0.1875rem;
    height: 2.5rem;
  }

  .step-title {
    font-size: 1.25rem;
  }

  .crop-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .crop-card {
    padding: 1rem;
  }

  .crop-icon {
    font-size: 1.5rem;
  }

  .nutrient-group {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .nutrient-card {
    padding: 1.25rem;
  }

  .analysis-summary {
    flex-direction: column;
    gap: 0.9375rem;
  }

  .form-navigation {
    flex-direction: column;
    gap: 0.625rem;
  }

  .nav-btn {
    width: 100%;
    min-height: 2.75rem;
    padding: 0.875rem 1.5rem;
  }

  .result-actions {
    flex-direction: column;
    gap: 0.625rem;
  }

  .action-btn {
    width: 100%;
    min-height: 2.75rem;
    padding: 0.75rem 1.25rem;
  }

  .recommendation-box {
    padding: 1.25rem;
  }

  .fertilizer-name {
    font-size: 1.5rem;
  }
}

/* Extra small screens (phones) */
@media (max-width: 480px) {
  .main-content {
    padding: 1.25rem 0.625rem;
  }

  .header-section {
    padding: 1.25rem 0;
  }

  .form-card {
    padding: 1.25rem 1rem;
    margin: 0 0.5rem;
  }

  .step-title {
    font-size: 1.125rem;
  }

  .step-description {
    font-size: 0.875rem;
  }

  .crop-card {
    padding: 0.875rem;
  }

  .crop-name {
    font-size: 1rem;
  }

  .crop-desc {
    font-size: 0.8125rem;
  }

  .nutrient-card {
    padding: 1rem;
  }

  .nutrient-info h4 {
    font-size: 1rem;
  }

  .nutrient-info p {
    font-size: 0.8125rem;
  }

  .nav-btn {
    font-size: 0.875rem;
    padding: 0.75rem 1.25rem;
  }

  .action-btn {
    font-size: 0.8125rem;
  }

  .result-title {
    font-size: 1.25rem;
  }

  .recommendation-box h4 {
    font-size: 1rem;
  }

  .fertilizer-name {
    font-size: 1.25rem;
  }

  .ready-message {
    padding: 1rem;
    font-size: 0.875rem;
  }
}
</style>
