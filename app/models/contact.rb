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

class Contact < ApplicationRecord
end
