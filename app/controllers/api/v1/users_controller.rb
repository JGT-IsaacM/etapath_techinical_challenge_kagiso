class Api::V1::UsersController < ApplicationController
    before_action :authenticate_user, only: %i[ destroy ]
    skip_before_action :verify_authenticity_token
    def user_params
        params.permit(:email, :password)
    end

    def create
        user = User.find_by_email(params[:email])
        if user
            render json: @user, status: :created
        
        @user = User.new(user_params)
        puts @user.inspect
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end
end
