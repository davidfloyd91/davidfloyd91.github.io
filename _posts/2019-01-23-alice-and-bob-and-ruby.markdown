---
layout: custom
title: "Alice, Bob and Ruby: exploring cryptography with the OpenSSL gem"
permalink: /ruby-openssl/
---

Cryptography is like chemistry or electrical engineering. We're aware that it's dreadfully important and that it lets us enjoy technologies we'd really rather not go without.

But it's so esoteric, so sunk in formulae and alchemical jargon, that it's easy to nod, agree it's Dreadfully Important  --  and leave it to the experts.  

That's not a terrible instinct. "Amateur cryptography" might not be a cause for concern on the level of, say, "amateur medicine." But it's a field where expertise matters and mistakes have consequences.

That said, in the era of mass data-creation and its unfortunate corollary -- mass data harvesting by corporations, governments, criminals and hybrids of the above -- everyone should aim to have at least some grounding in the methods at our disposal to hide and reveal the contents of messages.

That's what cryptography is: "hidden writing." Encrypting and decrypting, making and breaking codes.

Particularly if you're learning software development, it's important to get acquainted with the basics of cryptography. My total programming experience can be measured in weeks, but hey, it's never too early to start.

## OpenSSL

OpenSSL is a cryptography library that's available as a Ruby <a href="https://rubygems.org/gems/openssl" target="\_blank" rel="noopener noreferrer">gem</a>. To install it through the terminal, enter `gem install openssl`.

Once that's done we'll create a new Ruby file or <a href="https://rubygems.org/gems/pry/versions/0.12.2" target="\_blank" rel="noopener noreferrer">Pry</a> session and `require 'openssl'` at the top.

## Generate a new key pair

The first thing we'll need if we're going to communicate securely is a key pair. This method, adapted from the OpenSSL gem's <a href="https://ruby.github.io/openssl/OpenSSL.html" target="\_blank" rel="noopener noreferrer">documentation</a>, will create a new 2048-bit <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)" target="\_blank" rel="noopener noreferrer">RSA</a> public-private key pair:

<pre class="prettyprint lang-rb">
  key = OpenSSL::PKey::RSA.new(2048)
</pre>

If you'd like to save the public and private keys to the current directory, you can run the code below (this won't work in Pry):

<pre class="prettyprint lang-rb">
  File.open("private_key.pem", "w") { |k| k.write(key.to_pem) }

  File.open("public_key.pem", "w") { |k| k.write(key.public_key.to_pem) }
</pre>

If you're wondering what a public-private key pair is and why you might want one, here's a bit of history. If you'd just like to start encrypting and decrypting things, go ahead and <a href="#skip">skip</a> the next section.

Most of the following comes from Bruce Schneier's seminal <a href="https://www.schneier.com/books/applied_cryptography/" target="\_blank" rel="noopener noreferrer">textbook</a> on cryptography. If you're not looking for that kind of commitment, here's a <a href="https://www.youtube.com/watch?time_continue=5&v=2aHkqB2-46k" target="\_blank" rel="noopener noreferrer">lecture</a> that provides a good introduction to the material.

## 1900 BC to 1976

There is evidence that people have been making (and presumably breaking) written codes more or less since there's been writing. Ancient Egyptians appear to have developed <a href="https://pubweb.eng.utah.edu/~nmcdonal/Tutorials/EncryptionResearchReview.pdf#page=5" target="\_blank" rel="noopener noreferrer">encrypted hieroglyphs</a>.

For millennia, however, a fundamental problem remained. The basic assumption behind cryptography, its raison d'être, is that the "channel" -- the literal or virtual space the message must travel from sender to recipient -- is insecure. Otherwise there'd be no need to scramble and unscramble messages.

But how, then, can the sender (whom convention calls Alice) communicate the method behind the code to the receiver (Bob)? Unless Bob and Alice share some kind of secret -- the algorithm used to scramble the message, the "key" that serves as a necessary input to that algorithm, or both -- Bob won't be able to read the encoded message any better than some eavesdropper (Eve) or malicious attacker (Mallory).<a name="note1top" href="#note1"><sup>[1]</sup></a>

Alice must exchange the key with Bob using some secure channel. But they only need a key in the first place because their communications channels are insecure. What are are they to do?

Math.

In 1976, Whitfield Diffie and Martin Hellman <a href="https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange" target="\_blank" rel="noopener noreferrer">developed</a> what is known as public-key or asymmetric cryptography. Every other preexisting system -- now called symmetric cryptography -- involved just one key, which Alice and Bob must both know and both conceal. Using symmetric cryptography, their communication protocol goes something like this:

Alice writes a message and encrypts it with the single key, yielding what's called a "ciphertext." Bob decrypts the ciphertext with the same key, yielding the original message (called the "plaintext").

Through clever use of one-way functions,<a name="note2top" href="#note2"><sup>[2]</sup></a> Diffie and Hellman split this single key into two -- one public and one private -- with complementary functions: the public key encrypts a message, the private one decrypts it.

Given a private key, it's easy to figure out a valid public key that corresponds to it. Given a public key, it's practically impossible to figure out the private key.

The new protocol, then, is this: Alice writes a message and encrypts it with Bob's public key. Bob decrypts the resulting ciphertext with his private key to see the original message.

The implications of this development were huge: public keys, as the name suggests, can be shared freely. People put them on the internet. <a href="https://davidfloyd91.github.io/pgp/" target="\_blank" rel="noopener noreferrer">Here's mine.</a> The private key must be kept secret, but that's not too onerous because there's no one you really have to share it with.

To send an encrypted message to Bob, Alice only needs his public key, not his private one. To receive messages, she only has to share her public key, not her private one.

<a name="skip"></a>Now that that's out of the way...

## Encrypting and decrypting

Say there's a highly sensitive message that you (we'll call you Alice, for convention's sake) need to tell Bob in confidence. You don't have a secure way to meet up, so you have to tell him via email -- an insecure channel.

<pre class="prettyprint lang-rb">
message = "I'm actually not much of a fan of the government."
</pre>

To encrypt this message, you need Bob's public key. Again, he doesn't need to take any precautions with this, so he can just email it to you in plaintext. Or post it to his blog.

For illustrative purposes, we'll say the key pair `key` we generated earlier in this post is Bob's.

Using our `message`, Bob's `key`, and OpenSSL's `public_encrypt` method, we can <a style="background-color:#fff;color:#000;text-decoration:none" title="Not exactly. See last section.">safely\*</a> communicate our dissident views to Bob:

<pre class="prettyprint lang-rb">
ciphertext = key.public_encrypt(message)
</pre>

For fun, you can `puts ciphertext` to the terminal. The result (which will of course vary depending on your key) certainly doesn't look readable:

<pre class="prettyprint nocode" style="color: white; font-family: sans-serif;">
4=?$??h?$??c^?
              ?y?/l?a???[??5?j?=?x??W
                                     ??V?w??b??[&???uP?GM?(I?z?
	26??)?H????ׅg??t-,h?+?Ds??$??g?4?W???
                                            ?_????Kk?v?~
4x????gR????v9S?h?Z?;)V6???(]4?9Z?X/)?>~????????w?Io?}-M??]	B݉???F?z?,0nV?h?XX?Թ?$???C???
P???E?.G=
</pre>

Now pretend you're Bob and you've just received some gibberish like the above. It's from your cryptographically-inclined penpal Alice, so you try decrypting it with your private key:

<pre class="prettyprint lang-rb">
plaintext = key.private_decrypt(ciphertext)
</pre>

Voilà. When we `puts plaintext`, it's clear why Alice took such precautions:

<pre class="prettyprint nocode" style="color: white; font-family: sans-serif;">
I'm actually not much of a fan of the government.
</pre>

Shocking stuff.

## Signing and verifying

But perhaps the question you should be asking, Bob, is whether _you_ are taking the necessary precautions. Say that message came from a different email than Alice usually uses. Say it read like this instead:

<pre class="prettyprint nocode" style="color: white; font-family: sans-serif;">
Hello Bob. This is my new email haha. I forgot my password, I'm so forgetful. Speaking of which, I plum forgot the names and home addresses of our fellow undesirable agitators. Please send them all in .csv format. Thanks.
</pre>

Something tells you that email's not from Alice. But how can you be sure? With this sort of plain-vanilla asymmetric cryptography, anyone can send you an encrypted message and claim to be anyone else. At least with symmetric cryptography, only Alice had the key. At least, that's what you had to assume.

As it turns out, though, asymmetric cryptography provides a handy solution to this problem in the form of digital signatures.

If Alice wants to prove that she sent a given piece of text, she can sign it by reversing the normal procedure: encrypting the message with her own private (not public) key. Bob can then decrypt the result with Alice's public key. If that works, it shows that Alice -- or someone in possession of her private key -- produced the signature.

Let's assign the suspicious text above to `new_message`. Alice can sign it by encrypting it with her private `key`:

<pre class="prettyprint lang-rb">
signed_message = key.private_encrypt(new_message)
</pre>

To verify this signature, Bob would decrypt it with her public key:

<pre class="prettyprint lang-rb">
verified_message = key.public_decrypt(signed_message)
</pre>

Sure enough, if we `puts verified_message`:

<pre class="prettyprint nocode" style="color: white; font-family: sans-serif;">
Hello Bob. This is my new email haha. I forgot...
</pre>

In practice, however, it's better to use OpenSSL's `sign` and `verify` methods, which are made more secure by the incorporation of other cryptographic wizardry -- in particular, the SHA256 hash function.<a name="note3top" href="#note3"><sup>[3]</sup></a>

<pre class="prettyprint lang-rb">
securely_signed_message = key.sign("SHA256", new_message)
</pre>

That gives us some gobbledygook, which we can run -- along with the original `new_message` and the same hash function -- through the `verify` method.

<pre class="prettyprint lang-rb">
securely_verify_message = key.public_key.verify("SHA256", securely_signed_message, new_message)
</pre>

In this case, it returns `true`, so it was in fact signed by Alice's key.

## Fair warning

Please do not use the code above if you're aiming to do anything more than play around with cryptographic techniques in Ruby. These examples are meant to demonstrate some of the concepts involved while allowing you to get your hands mildly dirty.

They are not -- not -- secure enough to defend against a semi-determined attacker.

Rather than simply encrypting a message with Bob's public key, Alice (you) should use that public key to encrypt a separate symmetric key for you and Bob to use (protocols that use symmetric keys this way are less susceptible to brute-force and other attacks).

You should password-protect your keys. You should take any number of other essential precautions that I frankly don't know anything about.

In general, for applications where secrecy actually matters, you should not try to implement your own system, but use an existing one that's been built and vetted by professionals. "Don't roll your own crypto," the saying goes.

If you're just looking to communicate in a security-conscious way, <a href="https://www.signal.org/" target="\_blank" rel="noopener noreferrer">Signal</a> is an app for encrypted mobile messaging. <a href="https://protonmail.com/" target="\_blank" rel="noopener noreferrer">ProtonMail</a> provides encrypted email.

The cryptography is mostly under the hood in those tools, though. If you'd like to play around more with the functionality described above, but using an app built to professional security standards, try <a href="https://gpgtools.org/" target="\_blank" rel="noopener noreferrer">GPGTools</a>, which I'll use to sign off:

<pre class="prettyprint nocode" style="color: white; font-family: sans-serif;">
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

Thanks!
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEyhDzPQS0ahqvJ7sgRReCwxkVYi4FAlxGu00ACgkQRReCwxkV
Yi6PURAAhfFgSlV2MYs3UK+4wPLZ1kMiVPgMR4iAodmw7Qd+ti8ARnot5NSv3tjy
fEe55x/jPBIs7DOv+miOlUxzZ5RFfxtW1yrk/UWLV1qlBi+/qtqNmOEZXLyLaD+n
XXFIiScJxkbU1AsALi/SFC/Y4EJvoBgRbQZM8RHGLPA3sC2VygzsK2bayV1GJIji
NKp2+VDJlOONp1BUs3PMCfS8bPbULYJXhJYYL/SIiefliLSng2js4v4yLQ5/PvNM
8pZlilYaJYAKQ3+tJRrYLmd+OVMqOXC/pDyswtM5G3Q9hdFSedGp2ZaBwhIZD86y
RZRlZoUBH6W1vqJ64MVFmoO1m8N/nYxIDXdjEtmKbnAAyB82/h3LzTJBth5KDgbn
7ktCpjakouLZvz4SEfESOUAlVo3Cw27IvaNSiL9o9axWrX7EmdY2uYNs7zmviZsM
l4cTjXxBKuL9I+qUsZVLOIDbx9AEDBU7EfWTyLBHBW+Yg6FHtbEN6XOdFpJWghWM
JsX0FyaJ0HKoHYIOmbGxGkZP7x17UnfFXvBJfGothczBMf5IlQlipOq9wMsGlMUs
gN+0h0UEKOJMZK4EKY3eWF4JrrzvvheXA/seOH1NwesCGIRLhUepu1V+RFcEgV8V
WPgCWR/1VeonujO+cOdkJt71hAxvMjSoCGeTNvgvrDbWFJingQo=
=UK4R
-----END PGP SIGNATURE-----
</pre>

## Notes

<a name="note1" href="#note1top"><sup>[1]</sup></a>The post-1970s consensus is that it's best to keep your keys (public keys excepted) a secret and publish your algorithms for all to see. That way the math can be battle-tested over decades. For example, no one's produced a formal proof that RSA is secure, but they figure that if it could be compromised, someone would have done so by now. For a real-world analog, this is more or less how locks and keys for doors work. No one is disturbed by the idea that a would-be intruder has access to the same kind of lock you have: even if they went to the store, bought an identical lock, took it apart and mastered its mechanisms, they'd still need the correct key to get past _your_ lock.

<a name="note2" href="#note2top"><sup>[2]</sup></a>A one-way function is a function that's easy to do in one direction and functionally impossible to do in the other. An example, popular in cryptography, is multiplying two very large prime numbers: easy. What's harder, for someone presented with the product, is figuring out what two very large prime numbers form that even larger number's unique factors. With currently available technology, the sun would <a href="https://www.quora.com/How-long-will-it-take-to-break-a-256-bit-AES-encryption-key-using-brute-force" target="\_blank" rel="noopener noreferrer">devour the earth</a> before a planet full of computers could crack such computationally "hard" problems ... although quantum computers could change that.

<a name="note3" href="#note3top"><sup>[3]</sup></a>Hash functions, of which SHA256 is one example, are one-way functions. Given a chunk of data _x_, Alice can hash it into _y_, allowing her to prove to Bob -- assuming he  knows _x_ -- that she knows it as well. This way Alice does not have to expose _x_ over the insecure channel. Given only _y_, the hash of _x_, Eve and Mallory would find it all but impossible to find the "preimage" _x_. Hashes are <a href="https://en.wikipedia.org/wiki/Hash_function" target="\_blank" rel="noopener noreferrer">much more useful</a> than that example probably made them sound.
