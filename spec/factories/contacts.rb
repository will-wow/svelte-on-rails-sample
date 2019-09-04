# == Schema Information
#
# Table name: contacts
#
#  created_at :datetime         not null
#  email      :string
#  id         :bigint(8)        not null, primary key
#  name       :string
#  phone      :string
#  twitter    :string
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :contact do
    name { "MyString" }
    email { "MyString" }
    twitter { "MyString" }
    phone { "MyString" }
  end
end
