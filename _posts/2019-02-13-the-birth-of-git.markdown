---
layout: custom
title: "An Ancient Geek tragedy: Git, BitKeeper, Linux and the Uber Hacker"
permalink: /git/
---

Until a few hours ago, I might have guessed that Git was an ancient piece of software, originating in the lower strata of tech's geology, near SQL or regex. I was wrong.

Git was created in 2005. Another point I was ignorant of: it was developed by Linus Torvalds as the version control system for his more famous creation, the Linux kernel.

Having read that far into Git's Wikipedia <a href="https://en.wikipedia.org/wiki/Git" target="\_blank">page</a>, I figured I had probably exhausted the interesting tidbits surrounding the technology's history.

Again I was wrong.

#### The version control wars

The version control wars -- a term that's probably been used somewhere before -- are one of those things that seem to occur again and again in tech history: a cycle of hubris, rivalry, betrayal, victory and defeat worthy of a geek Sophocles.

The first version of Linux (which powers what-I-think-you're-supposed-to-call GNU/Linux operating systems) was released in 1991.<a name="note1top" href="#note1"><sup>[1]</sup></a>

Skip to 2005, and a hobby project had become a massive enterprise, with thousands of developers collaborating on it. Because it was and is a free, open-source project, these developers were working at different paces in disparate time zones on different aspects of the system.

Given the scale of the project, version control would have been a challenge even if they had been clocking in and out at some Linux Headquarters, with enforced marching orders.

No problem, though, the project had BitKeeper. This version control software had been adopted in 2002 and was being provided free of charge to the Linux community.

#### License and registration, please

Now, "free of charge" does not mean "free." The GNU Project with which Linux has become synonymous (and largely, if perhaps unfairly, eclipsed) was founded on the idea that software should not be subject to licenses, restrictions, patents or any other legal obstacles to distribution, use and modification.

(If the term "free software" is unfamiliar, think "open source," but know that Richard Stallman, creator of the GNU Project, would criticize that comparison.)

Richard Stallman criticized Torvalds for Linux's reliance on proprietary software. But the reason Torvalds and other developers decided to create a new version control system is that Larry McVoy, CEO of BitMover (sic -- BitKeeper is produced by BitMover Inc.) pulled support for the Linux community.

Anyone who wanted to use BitKeeper could pay for it, McVoy decided in early 2005 -- idealistic free software dev or no.

Typical software company CEO, this is why proprietary software is wrong. Right?

Perhaps. But while McVoy reportedly twirled his mustache and chortled while making this decision,<a name="note2top" href="#note2"><sup>[2]</sup></a> he was <a href="https://www.linux.com/news/bitkeeper-and-linux-end-road" target="\_blank">not unprovoked</a>.

Andrew Tridgell, whom InfoWorld <a href="https://www.infoworld.com/article/2670360/operating-systems/linus-torvalds--bitkeeper-blunder.html" target="\_blank">described</a> as an "uber hacker" at the time, had apparently attempted to reverse-engineer BitKeeper's protocols in order to facilitate open-source access to the Linux repository's history.

Torvalds criticized Tridgell for forcing McVoy's hand, but the uber hacker received defense and praise from certain <a href="https://www.theregister.co.uk/2005/04/14/torvalds_attacks_tridgell/" target="\_blank">corners</a> of the geek media.

#### Two bitter pills

Such wrangling over who has what right to what ones and zeros is anything but unique. I won't dwell too long in the no-man's-land between the free and proprietary trenches.

But the story does have a poignant epilogue. Well, two.

Hippy, pie-in-the-sky, no-license-no-charge Git has gained a monopolistic stranglehold over the version control market. According to StackOverflow's most recent developer <a href="https://insights.stackoverflow.com/survey/2018/" target="\_blank">survey</a>, 87% of respondents use it. In second place, at 16%, is Subversion (respondents could apparently pick more than one option).

BitKeeper is nowhere to be found on that list. A couple of years ago, when Git's marketshare was <a href="https://insights.stackoverflow.com/survey/2015" target="\_blank">closer</a> to 70%, BitMover tapped out. The company, whose defense of its proprietary software had sown its own destruction, gave up those proprietary claims altogether. BitKeeper became <a href="https://users.bitkeeper.org/t/bk-7-2ce-released-2016-05-09/93?utm_source=anzwix" target="\_blank">open source</a> in 2016.

A victory for open source and the hacker ethos? A bitter dose of truth for the greed-blind corporati? Sure.

But Git owes much of its success to GitHub, a site founded in 2008 that proved an immensely popular place to host Git repositories.

And last year, GitHub was <a href="https://news.microsoft.com/2018/06/04/microsoft-to-acquire-github-for-7-5-billion/" target="\_blank">bought</a> by Microsoft. The war rumbles on.

#### Notes

<a name="note1" href="#note1top"><sup>[1]</sup></a>When Torvalds was 21 years old, what have you done lately?

<a name="note2" href="#note2top"><sup>[2]</sup></a>This is a joke.
