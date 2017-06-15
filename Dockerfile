FROM ruby:2.4.1

# Set locale ja_JP.UTF-8
RUN apt-get update && apt-get install -y --force-yes locales && rm -rf /var/lib/apt/lists/* \
	&& localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
ENV LANG ja_JP.utf8

# Set timezone Asia/Tokyo
RUN echo "Asia/Tokyo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Install yarn
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

# Install node.js
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
  apt-get install nodejs

# Set working directory
RUN mkdir /myapp
WORKDIR /myapp

ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock

RUN bundle install
ADD . /myapp
