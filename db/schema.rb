# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170605193330) do

  create_table "horses", force: :cascade do |t|
    t.string "name", null: false
    t.string "url", null: false
    t.date "date", null: false
    t.string "image_url", null: false
    t.string "race"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date"], name: "index_horses_on_date"
    t.index ["name"], name: "index_horses_on_name"
    t.index ["race"], name: "index_horses_on_race"
  end

end
