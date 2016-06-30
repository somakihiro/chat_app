class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @messages = Message.all
  end

  def create
    @message = current_user.messages.build(message: params[:message])
    @message.save
    render json: { message: @message }
  end
end