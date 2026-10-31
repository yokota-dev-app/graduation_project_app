require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:user)).to be_valid
    end

    it "requires a name" do
      user = build(:user, name: nil)

      expect(user).not_to be_valid
      expect(user.errors.of_kind?(:name, :blank)).to be(true)
    end

    it "requires an email" do
      user = build(:user, email: nil)

      expect(user).not_to be_valid
      expect(user.errors.of_kind?(:email, :blank)).to be(true)
    end

    it "requires a unique email" do
      existing_user = create(:user)
      user = build(:user, email: existing_user.email)

      expect(user).not_to be_valid
      expect(user.errors.of_kind?(:email, :taken)).to be(true)
    end

    it "requires a password when creating a user" do
      user = build(:user, password: nil)

      expect(user).not_to be_valid
      expect(user.errors.of_kind?(:password, :blank)).to be(true)
    end

    it "requires a password of at least six characters" do
      user = build(:user, password: "short")

      expect(user).not_to be_valid
      expect(user.errors.of_kind?(:password, :too_short)).to be(true)
    end

    it "is valid when password confirmation matches" do
      user = build(:user, password_confirmation: "password123")

      expect(user).to be_valid
    end

    it "is invalid when password confirmation does not match" do
      user = build(:user, password_confirmation: "different")

      expect(user).not_to be_valid
      expect(user.errors.of_kind?(:password_confirmation, :confirmation)).to be(true)
    end
  end

  describe "#authenticate" do
    let(:user) { create(:user, password: "password123") }

    it "returns the user when the password is correct" do
      expect(user.authenticate("password123")).to eq(user)
    end

    it "returns false when the password is incorrect" do
      expect(user.authenticate("incorrect")).to be(false)
    end
  end
end
