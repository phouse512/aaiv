require 'test_helper'

class AaivClassesControllerTest < ActionController::TestCase
  setup do
    @aaiv_class = aaiv_classes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:aaiv_classes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create aaiv_class" do
    assert_difference('AaivClass.count') do
      post :create, aaiv_class: { graduationYear: @aaiv_class.graduationYear, person: @aaiv_class.person }
    end

    assert_redirected_to aaiv_class_path(assigns(:aaiv_class))
  end

  test "should show aaiv_class" do
    get :show, id: @aaiv_class
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @aaiv_class
    assert_response :success
  end

  test "should update aaiv_class" do
    patch :update, id: @aaiv_class, aaiv_class: { graduationYear: @aaiv_class.graduationYear, person: @aaiv_class.person }
    assert_redirected_to aaiv_class_path(assigns(:aaiv_class))
  end

  test "should destroy aaiv_class" do
    assert_difference('AaivClass.count', -1) do
      delete :destroy, id: @aaiv_class
    end

    assert_redirected_to aaiv_classes_path
  end
end
