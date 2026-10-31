require "rails_helper"

RSpec.describe User, type: :model do
  it "builds a valid user with the factory" do
    expect(build(:user)).to be_valid
  end
end
