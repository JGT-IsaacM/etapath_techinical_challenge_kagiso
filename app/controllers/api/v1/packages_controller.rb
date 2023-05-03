require 'knock'

class Api::V1::PackagesController < ApplicationController
  
  include Knock::Authenticable

  before_action :authenticate_user
  before_action :set_current_user
  before_action :set_package, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /packages or /packages.json
  def index
    @packages = Package.where(user_id: @current_user.id);
    render json: @packages
  end

  # GET /packages/1 or /packages/1.json
  def show
  end

  # POST /packages or /packages.json
  def create
    @package = @current_user.packages.build(package_params)

    if @package.save
      render json: @package
    else
      render json: @package.errors
    end
  end

  # PATCH/PUT /packages/1 or /packages/1.json
  def update
    if @package.update(package_params)
      render json: @package
    else
      render json: @package.errors
    end
  end

  # DELETE /packages/1 or /packages/1.json
  def destroy
    if @package.destroy
      render json: @package
    else
      render json: @package.errors
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_package
      @package = Package.find(params[:id])

      if !@package
        head(:unprocessable_entity)
      end

    end

    def set_current_user
      @current_user = User.find_by_authentication_token(request.headers['Authorization'])
      if !@current_user
        head(:unprocessable_entity)
      end

    end

    # Only allow a list of trusted parameters through.
    def package_params
      params.require(:package).permit(:reference_number, :location, :destination, :date, :timeslot, :user_id, :id)
    end
end