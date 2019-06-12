---
layout: custom
title: "Python for Twitter: getting started with Tweepy"
permalink: /tweepy/
---

If you've got a hankering to query the Twitter API using Python, by far the most popular library for the job is Tweepy. In this post I'll show you how to install, authorize and begin to familiarize yourself with Tweepy by building a simple CLI.

First of all, if you haven't, you'll need to obtain API access by <a href="https://developer.twitter.com/en/apply-for-access" target="\_blank" rel="noopener noreferrer">registering with Twitter</a>. Assuming that's done, it's time to <a href="https://github.com/tweepy/tweepy" target="\_blank" rel="noopener noreferrer">install Tweepy</a>:

<pre class="prettyprint lang-bsh">
$ pip install tweepy
</pre>

Now create a `tweepy_futzting.py` Python file (the name is up to you, naturally) and pop this line in at the top:

<pre class="prettyprint lang-py">
import tweepy
</pre>

We're on our way. (The complete code is available as a Gist <a href="https://gist.github.com/davidfloyd91/428fb3b9acaf229d803e421ac319325b" target="\_blank" rel="noopener noreferrer">here</a>).

The next step is to authorize Tweepy using your Twitter API credentials, which can be extremely simple or sort of simple, depending on what you plan to do with this code. If you want to push it to GitHub or otherwise show it to the world--likely, given how accomplished you're about to feel--don't do this:

<pre class="prettyprint lang-py">
import tweepy

twitter_app_auth = {
    # this is bad
    'consumer_key': 'blahblahthisismykey98725987',
    # do not do this
    'consumer_secret': 'doopdedoopsecretkey948ru87',
    # unless you're keeping the code entirely and utterly to yourself
    'access_token': 'tokentime825729837498',
    # seriously don't push API keys up to GitHub, don't even show your aunt
    'access_token_secret': 'ooohsecrettokenthatsexciting29834us98u',
}

auth = tweepy.OAuthHandler(twitter_app_auth['consumer_key'], twitter_app_auth['consumer_secret'])
auth.set_access_token(twitter_app_auth['access_token'], twitter_app_auth['access_token_secret'])

api = tweepy.API(auth)
</pre>

Instead, store your credentials locally, where the bad-rotten internauts can't get them. In Mac OS and Linux, you can do that temporarily by running the following (for each of the four tokens) in the terminal ...

<pre class="prettyprint lang-bsh">
$ export CONSUMER_KEY="blahblahthisismykey98725987"
</pre>

... or permanently by adding the same line to your `~/.bash_profile` file. Check that a variable is defined correctly by running:

<pre class="prettyprint lang-bsh">
$ echo $CONSUMER_KEY
</pre>

Now you can import Python's `os` module to access these environment variables, making your code safe for public consumption:

<pre class="prettyprint lang-py">
import tweepy
import os

twitter_app_auth = {
    'consumer_key': os.environ.get('CONSUMER_KEY'),
    'consumer_secret': os.environ.get('CONSUMER_SECRET'),
    'access_token': os.environ.get('ACCESS_TOKEN'),
    'access_token_secret': os.environ.get('ACCESS_TOKEN_SECRET'),
}

auth = tweepy.OAuthHandler(twitter_app_auth['consumer_key'], twitter_app_auth['consumer_secret'])
auth.set_access_token(twitter_app_auth['access_token'], twitter_app_auth['access_token_secret'])

api = tweepy.API(auth)
</pre>

At this point, the world is your chalupa. The Tweepy docs will show you the wonderful array of queries one can make. But just to get started, let's let the user pick a Twitter handle:  

<pre class="prettyprint lang-py">
def get_input():
    print('What user would you like to see?')
    return input()

input = get_input()

user = api.get_user(input)
</pre>

Now when you run `$ python3 tweepy_futzing.py`, you'll be prompted to input a username, which you can plop straight in -- `jack`, `realdonaldtrump` -- no `@` symbol or quotes. Then nothing will happen and the program will end.

Not ideal, so to get a taste of the methods Tweepy provides, let's print out a quick dossier of our chosen user. My first instinct, based on some of the reporting I used to do, is to look for red flags of automation or astroturfing:

<pre class="prettyprint lang-py">
print('creation date:', user.created_at)
print('default profile image?', user.default_profile_image)
print('statuses count:', user.statuses_count)
print('favorites count:', user.favourites_count)
print('followers count:', user.followers_count)
print('friends count:', user.friends_count)

print('friends:')
friends = user.friends()

for friend in friends:
    print(friend.screen_name)
</pre>

Here's what the code above is asking:

When was the user created? (If last month, be wary.) Does it have a default profile image? (Is it an "egg," as the kids used to say?) How many statuses does it have? (Zero or fifty million might raise eyebrows.) Favorites? Followers? Followees? (Or "friends," in Tweepish?)

And who are those followees? Is this account following the same six politicians and pundits as every other created-in-the-last-month, superhumanly-prolific-at-favoriting, followerless egg who's called you a snowflake or fascist today?

Thanks to Tweepy, now you can check.
