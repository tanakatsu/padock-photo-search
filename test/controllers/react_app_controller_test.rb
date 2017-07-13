require 'test_helper'

class ReactAppControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get react_app_index_url
    assert_response :success
  end

end
