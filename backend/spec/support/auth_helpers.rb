module AuthHelpers
  def sign_in(user, password: "password123")
    post "/api/v1/login", params: { email: user.email, password: password }, as: :json
  end
end

RSpec.configure do |config|
  config.include AuthHelpers, type: :request
end
