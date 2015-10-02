class PublicActivityController < ApplicationController
  authorize_resource except: :index#, param_method: :thing_params

  def index
    authorize!(:read, PublicActivity::Activity)
    set_content_title('fa-fw fa fa-video-camera', ['Public Activity'])
    @activities = PublicActivity::Activity.first(10)
  end
end
