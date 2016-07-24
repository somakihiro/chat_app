class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    # @message = current_user.messages.build(body: params[:body])
    @message = current_user.messages.build(message_params)
    @message.save
    render json: { message: @message }
  end

  private

    def message_params
      params.require(:message).permit(:body, :to_user_id, :image)
    end
end