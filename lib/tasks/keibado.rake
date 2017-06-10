# frozen_string_literal: true
# encoding: utf-8

require './lib/keibado_crawler.rb'

namespace 'keibado' do
  # rake keibado:import_all [dryrun=true] [resume=yymmdd]
  desc 'Import all data'
  task import_all: :environment do
    horse_data = []
    current_year = Date.current.year
    years = (2002..current_year).to_a

    # Allow to run only for specified day of week (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6)
    wday = ENV['wday']
    wdays = wday.nil? ? [] : wday.split(/,/)
    if wdays.size > 0
      if wdays.include?(Date.current.wday.to_s) == false
        puts 'Exited: Not target day of week.'
        exit
      end
    end

    puts 'Get backnumbers...'
    backnumbers = KeibadoCrawler.get_backnumber_list(years)
    puts backnumbers.join(", ")

    imported_bn_dates = Horse.pluck(:date).uniq.map { |dt| dt.strftime("%y%m%d") }

    unimported_backnumbers = (Set.new(backnumbers) - Set.new(imported_bn_dates)).to_a.sort
    puts "target=#{unimported_backnumbers.join(", ")}"

    resume_from = ENV['resume']
    skip = resume_from.present?
    unimported_backnumbers.each do |backnumber|
      skip = false if resume_from && backnumber == resume_from
      next if skip

      ENV['backnumber'] = backnumber
      Rake::Task["keibado:import_backnumber"].execute
    end
  end

  # rake keibado:import_latest [dryrun=true] 
  desc 'Import data from latest backnumber'
  task import_latest: :environment do
    current_year = Date.current.year
    KeibadoCrawler.get_backnumber_list(current_year)
    puts 'Get backnumber...'
    backnumbers = KeibadoCrawler.get_backnumber_list(current_year)
    latest_backnumber = backnumbers.first
    puts latest_backnumber

    ENV['backnumber'] = latest_backnumber
    Rake::Task["keibado:import_backnumber"].execute
  end

  # rake keibado:import_backnumber backnumber=yymmdd [dryrun=true] 
  desc 'Import data from the specified backnumber'
  task import_backnumber: :environment do
    backnumber = ENV['backnumber']
    dryrun_env = ENV['dryrun']
    dryrun = dryrun_env == 'true' ? true : false

    unless backnumber =~ /\d\d\d\d\d\d/
      puts "Error: wrong backnumber format (#{backnumber})"
      next
    end

    puts 'Dryrun mode' if dryrun
    puts "Get data from #{backnumber}"
    horse_data = KeibadoCrawler.get_data_from_backnumber(backnumber)
    puts horse_data

    # Create Horse record
    ActiveRecord::Base.transaction do
      horse_data.each do |data|
        horse = Horse.new(name: data[:name],
                          url: data[:url],
                          image_url: data[:image_url],
                          date: Date.parse("20" + data[:bn]),
                          race: data[:race])
        horse.validate!
        next if dryrun
        horse.save! unless Horse.exists?(name: data[:name], date: data[:date])
      end
    end
    puts 'Saved.'
  end
end

