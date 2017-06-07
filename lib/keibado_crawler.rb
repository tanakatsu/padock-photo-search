require './lib/keibado.rb'

class KeibadoCrawler
  BASE_URL = "http://www.keibado.ne.jp/keibabook"

  class << self
    def get_backnumber_list(years)
      bn_list = []
      years = [years] unless years.is_a?(Array)
      years.each do |year|
        bn_list.concat(Keibado.get_backnumber_list(year))
      end
      bn_list
    end

    def get_data_from_backnumber(bn)
      horses = Keibado.get_horse_list_of_week(bn)
      horses.each do |horse_data|
        image_url = Keibado.get_horse_padock_image_url(horse_data[:url])
        horse_data[:image_url] = "#{BASE_URL}/#{bn}/#{image_url}"
      end
      raise "Error!: No horses found. Something may be wrong with algorithm." if horses.empty?
      horses
    end
  end
end

# bn_list = KeibadoCrawler.get_backnumber_list([2017])
# horses = KeibadoCrawler.get_data_from_backnumber(bn_list[0])
# puts horses
# horses = KeibadoCrawler.get_data_from_backnumber("170109")
# puts horses
