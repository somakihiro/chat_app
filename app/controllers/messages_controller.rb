class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @messages = Message.all
  end

  def create
    @message = Message.new(message: params[:message])
    @message.save
    render json: { message: @message }
  end

  # private

  #   def message_params
  #     params.require(:message).permit(:message)
  #   end

end