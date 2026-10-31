require "rails_helper"

RSpec.describe "Api::V1 auth", type: :request do
  describe "POST /api/v1/signup" do
    let(:valid_params) do
      { user: { name: "Taro", email: "taro@example.com", password: "password123", password_confirmation: "password123" } }
    end

    it "creates a user and logs them in" do
      expect { post "/api/v1/signup", params: valid_params, as: :json }.to change(User, :count).by(1)

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["user"]).to include("name" => "Taro", "email" => "taro@example.com")
      expect(response.parsed_body["user"]).not_to have_key("password_digest")

      get "/api/v1/logged_in"
      expect(response.parsed_body["logged_in"]).to be(true)
    end

    it "returns errors when the email is already taken" do
      create(:user, email: "taro@example.com")

      expect { post "/api/v1/signup", params: valid_params, as: :json }.not_to change(User, :count)
      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["errors"]).not_to be_empty
    end

    it "returns errors when the password confirmation does not match" do
      valid_params[:user][:password_confirmation] = "different"

      expect { post "/api/v1/signup", params: valid_params, as: :json }.not_to change(User, :count)
      expect(response).to have_http_status(:unprocessable_content)
    end

    it "returns errors when required fields are missing" do
      post "/api/v1/signup", params: { user: { name: "", email: "", password: "password123" } }, as: :json

      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["errors"].size).to be >= 2
    end
  end

  describe "POST /api/v1/login" do
    let!(:user) { create(:user, password: "password123") }

    it "logs in with valid credentials" do
      post "/api/v1/login", params: { email: user.email, password: "password123" }, as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["user"]).to include("id" => user.id, "email" => user.email)

      get "/api/v1/logged_in"
      expect(response.parsed_body).to include("logged_in" => true)
    end

    it "rejects a wrong password" do
      post "/api/v1/login", params: { email: user.email, password: "wrong" }, as: :json

      expect(response).to have_http_status(:unauthorized)

      get "/api/v1/logged_in"
      expect(response.parsed_body["logged_in"]).to be(false)
    end

    it "rejects an unknown email" do
      post "/api/v1/login", params: { email: "nobody@example.com", password: "password123" }, as: :json

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE /api/v1/logout" do
    it "ends the session" do
      user = create(:user)
      sign_in(user)

      delete "/api/v1/logout"
      expect(response).to have_http_status(:ok)

      get "/api/v1/logged_in"
      expect(response.parsed_body["logged_in"]).to be(false)
    end
  end
end
