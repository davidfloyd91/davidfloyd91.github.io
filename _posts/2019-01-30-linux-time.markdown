---
layout: post
title: Linux time
---

I'd very much like to do this blog post on basic pen testing -- a.k.a. ethical hacking -- or how to spin up your own web server.

Unfortunately I'm far from being able to say intelligent things about either, but I _can_ help with a preliminary step: getting yourself set up on Linux.

For some of the more serious pursuits a budding tech wizard is likely to gravitate to, including the examples above, the normie (no offense) operating systems -- Windows and Mac OS -- aren't optimal. To get up to some serious hacking, I'm told, you'll want Kali Linux. To run a web server, a better bet might be Ubuntu Server. (Opinions vary and I'm no expert.) Both of these are "distributions" -- flavors, essentially -- of what's commonly called Linux.

Time for a quick aside. Skip to the next section if you're not in the mood for an anecdote.

I say "commonly called Linux" because I once interviewed Richard Stallman, an old-school programmer and the founder of the GNU Project. He's largely responsible for what he wishes we would call GNU/Linux or just-GNU, but not just-Linux. GNU, you see, is the operating system, while Linux -- invented later -- is just the kernel.

My agreeing to abide by this nomenclature was a precondition to the interview. So was our not using any "unfree" software, like Skype or WhatsApp, to communicate. Another rank injustice: the victory of "open source" in the popular consciousness over Stallman's practically identical but ideologically distinct "free software" movement. Also I'm pretty sure the NSA interrupted our call. Anyway.

## Getting set up

If you're using a Mac, here's how to start playing around with Linux.

We're going to use what's called a "virtual machine," meaning you'll need a "virtualizer." Head to VirtualBox's [downloads page](https://www.virtualbox.org/wiki/Downloads) and click "OS X hosts" under "VirtualBox 6.0.4 platform packages" (the version number will likely have changed.)

When the download is complete, open the .dmg file, which will guide you through the install process. Once that's done you can delete the download file.

Now open VirtualBox. You'll see there's not much going on yet. That's because we haven't loaded it up with any virtual machines. Time to download a Linux distribution.

This post will go over installing Ubuntu Desktop, because I understand it's as good a place as any to start and because I haven't downloaded it yet (making me less liable to elide over minor snags in the process). The distro is available at Canonical's [site](https://www.ubuntu.com/download). Note that, depending on your exact motivation for wanting to learn Linux, something else -- Kali or CentOS or Debian -- might be more appropriate. The process for installing it will be more or less the same, though.

If you do opt for Ubuntu Desktop, it's probably best to go with the LTS or "long-term support" version, whatever that currently is (18.04.1) at the time of writing. Up to you. Hit "Download" and hang tight for a couple of minutes, as the file is around 2 GB.

When that's done, leave the .iso file you just downloaded alone for a second. Head to VirtualBox and click the bright-blue sunbursty-looking "New" button.

You'll see a dropdown menu, where you'll be prompted to name your virtual machine. Might I suggest "Ubuntu Desktop" or "Ubuntu"? Click "Continue." Memory size is next. Go with the default. In the following panel, select "Create a virtual hard disk now" and go with "VDI" when prompted. Choose "Dynamically allocated" in the next panel, then choose the amount of disk storage you'd like to allocate to your machine (I went with the default, 10 GB).

You'll be taken back to the VirtualBox home screen, where you'll see your shiny new "Ubuntu Desktop" VM "powered off" and waiting. Select it and hit "Start," a big friendly green arrow. VirtualBox (which may have opened a tiny window and hidden it behind everything else) will prompt you to "select a virtual optical disk..." Using the folder icon, find and open the .iso file you downloaded, containing Ubuntu.

You'll be directed to perform more setup-configure-install rigamarole. Push through, and keep in mind that when the prompts refer to "your computer" as having no currently installed operating system, or asks if you'd like to erase your disk, Ubuntu doesn't know it's confined to a small virtual machine operating within your larger computer. These things aren't as serious as they sound.

Happy GNU/Linuxing.
