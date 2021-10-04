require "application_system_test_case"

class PackagesTest < ApplicationSystemTestCase
  setup do
    @package = packages(:one)
  end

  test "visiting the index" do
    visit packages_url
    assert_selector "h1", text: "Packages"
  end

  test "creating a Package" do
    visit packages_url
    click_on "New Package"

    fill_in "Date", with: @package.date
    fill_in "Destination", with: @package.destination
    fill_in "Location", with: @package.location
    fill_in "Reference number", with: @package.reference_number
    fill_in "Timeslot", with: @package.timeslot
    click_on "Create Package"

    assert_text "Package was successfully created"
    click_on "Back"
  end

  test "updating a Package" do
    visit packages_url
    click_on "Edit", match: :first

    fill_in "Date", with: @package.date
    fill_in "Destination", with: @package.destination
    fill_in "Location", with: @package.location
    fill_in "Reference number", with: @package.reference_number
    fill_in "Timeslot", with: @package.timeslot
    click_on "Update Package"

    assert_text "Package was successfully updated"
    click_on "Back"
  end

  test "destroying a Package" do
    visit packages_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Package was successfully destroyed"
  end
end
