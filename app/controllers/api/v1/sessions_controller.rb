require 'bcrypt'
class Api::V1::SessionsController < ApplicationController
    #protect_from_forgery with: :null_session
    #protect_from_forgery except: :sample
    skip_before_action :verify_authenticity_token

    def create
        user = User.find_by_email(params[:email])
        if user&.valid_password?(params[:password])
            render json: user.as_json(only: [:id, :email, :authentication_token]), status: :created
        else
            head(:unauthorized)
        end
    end

    def destroy
        user = User.find_by_authentication_token(request.headers['Authorization'])
        if !user
            head(:unauthorized)
        else
            user.authentication_token = ''
            user.save
            head(:ok)
        end
    end

    # Only allow a list of trusted parameters through.
    def session_params
       params.require(:session).permit(:email, :password, :authentication_token)
     end
end