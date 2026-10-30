module Api
  module V1
    class PromptsController < ApplicationController
      before_action :require_login

      # プロンプト作成（初版のバージョンも同時に保存）
      def create
        prompt = current_user.prompts.new(prompt_params.slice(:title, :description, :is_public))
        prompt.prompt_versions.build(
          version_number: 1,
          content: prompt_params[:content],
          variable_settings: prompt_params[:variable_settings] || {}
        )

        if prompt.save
          render json: { id: prompt.id }, status: :created
        else
          render json: { errors: prompt.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def prompt_params
        params.require(:prompt).permit(:title, :description, :is_public, :content, variable_settings: {})
      end

      def current_user
        @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
      end

      def require_login
        render json: { errors: ['ログインが必要です'] }, status: :unauthorized unless current_user
      end
    end
  end
end
