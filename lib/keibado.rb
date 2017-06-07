require 'nokogiri'
require 'kconv'
require 'open-uri'

class Keibado
  BASE_URL = "http://www.keibado.ne.jp/keibabook"

  class << self
    def get_horse_list_of_week(bn)
      html = self.get_page("#{BASE_URL}/#{bn}/index.html")
      horses = []
      doc = Nokogiri::HTML(html.toutf8)
      # doc.css('table[class="mini"] tr td a').each do |elm|
      #   name = elm.text
      #   file = elm.attr(:href)
      #   url = "#{BASE_URL}/#{bn}/#{file}"
      #   horses << {name: name, url: url, bn: bn}
      # end

      race = ""
      td_elms = doc.css('table[class="mini"] tr td')
      td_elms = doc.css('table[bgcolor="#003300"][width="145"] tr td') if td_elms.size == 0
      td_elms = doc.css('table[bgcolor="#003300"][width="140"] tr td') if td_elms.size == 0
      td_elms.each do |elm|
        if elm.css('a').size == 0
          race = elm.css('font b').text if elm.css('font b').size > 0
          race = elm.css('b font').text if elm.css('b font').size > 0
          race = elm.css('font').text if elm.css('font').size > 0
          race = race.gsub("◆", '')
        else
          links = elm.css("a")
          links = elm.css("font a") if links.size == 0
          links = elm.css("p font a") if links.size == 0
          links.each do |a_elm|
            name = a_elm.text
            file = a_elm.attr(:href)
            url = "#{BASE_URL}/#{bn}/#{file}"

            name = "プロディガルサン" if url == "http://www.keibado.ne.jp/keibabook/160919/photo12.html" # forced correction

            horses << {name: name, url: url, bn: bn, race: race}
          end
        end
      end
      horses
    end

    def get_horse_padock_image_url(url)
      html = self.get_page(url)
      doc = Nokogiri::HTML(html.toutf8)
      elms = doc.css('table tr td img')
      elms.map { |elm| elm.attr(:src) }.select { |s| s =~ /images\/pp\d\d\.jpg/ }.first
    end

    def get_backnumber_list(year)
      html = self.get_page("#{BASE_URL}/bn/#{year}.html")
      doc = Nokogiri::HTML(html.toutf8)
      elms = doc.css('table tr td font a')
      bn_list = elms.map { |elm| elm.attr(:href) }
      .select { |s| s =~ /\.\.\/\d\d\d\d\d\d\/index\.html/ }
      .map { |s| s.split('/')[1] }
      .uniq
      .sort
    end

    def get_page(url)
      open(url).read
    end
  end
end
