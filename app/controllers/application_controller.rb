require 'knock'
class ApplicationController < ActionController::Base
    include Knock::Authenticable

    private

     def authenticate_user
        token = request.headers['Authorization']
        authenticate_for(token)
    end
end
