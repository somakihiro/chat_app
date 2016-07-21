class Api::CurrentUserController < ApplicationController

  def index
    render json: current_user.as_json(include: :messages)
  end

end