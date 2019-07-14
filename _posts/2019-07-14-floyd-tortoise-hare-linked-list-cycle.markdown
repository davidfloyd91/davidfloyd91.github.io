---
layout: custom
title: "Floyd's tortoise and hare: how to detect a cycle in a Python linked list"
permalink: /floyd-tortoise-hare-cycle-linked-list-python/
---

I recently came across a LeetCode <a href="https://leetcode.com/problems/linked-list-cycle/" target="\_blank" rel="noopener noreferrer">question</a> that seemed perfectly straightforward: "Given a linked list, determine if it has a cycle in it."

That is, given a list like the following

<div class="post-image-container">
  <img class="post-image" src="/assets/post-images/linked-list.png">
  <p class="post-image-caption">Courtesy of <a href="https://en.wikipedia.org/wiki/Linked_list" target="\_blank" rel="noopener noreferrer">Wikimedia</a>.</p>
</div>

the function would return `false`: the list never loops back onto itself. In contrast this list

<div class="post-image-container">
  <img class="post-image" src="/assets/post-images/circular-linked-list.png">
  <p class="post-image-caption"><a href="https://en.wikipedia.org/wiki/Linked_list" target="\_blank" rel="noopener noreferrer">Ditto</a>.</p>
</div>

would return `true`: the list has a cycle.

It didn't take too long to devise a Python function that would do the job.

First, set up an empty dictionary, called `nodes`. Then move through the list node by node, doing one of three things for each: if there is no next node, we're at the end and there can't be a cycle, so we can just return `false`; if we've seen the next node before -- that is, it's `in nodes` -- we've looped back around (conveniently, the non-cyclical test cases only include unique values), so we can return `true`; otherwise, we add the value to `nodes` (giving it `1` as a placeholder value) and move onto the `.next` one.

<pre class="prettyprint lang-python">
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        nodes = {}
        current_head = head

        while current_head != None:
            if current_head in nodes:
                return True
            else:
                nodes[current_head] = 1

            current_head = current_head.next

        return False
</pre>

This is a solution, and it's not the worst one. It's faster than 72 percent of Python submissions, though it uses more memory than 95 percent of them. That might be okay, if it weren't for the last line in the prompt:

"Can you solve it using O(1) (i.e. constant) memory?"

Ah. Our dictionary solution is fairly quick, but the memory required increases in line with the size of the input: O(n). I stared blankly at the algorithm for a few minutes, trying to will its memory complexity away, found this approach ineffective, and asked <s>Google</s> DuckDuckGo.

The creative and intuitive -- if not immediately obvious -- solution, it turns out, is credited to Cousin Bob (kidding, as far as I know, I have no relation to Turing Award-winning computer scientist <a href="https://en.wikipedia.org/wiki/Robert_W._Floyd/" target="\_blank" rel="noopener noreferrer">Robert W. Floyd</a>, who graduated from the University of Chicago at 17, became a full professor at Stanford without a PhD, and once beat God at backgammon).

Imagine a race between a tortoise and a hare. The hare moves twice as fast and never naps because this is science, not a fable. Therefore, if the track is a straight line, the tortoise and the hare will never be neck-and-neck.

If, on the other hand, the track is a loop, the hare will lap the tortoise, and for a moment, the two will be at the same position. Of course, the two are in the same position when they begin, which complicates this simple test, so we give the hare a head start. Life isn't fair. (Note that, because our `while` loop no longer checks for the existence of the current node, we do a quick initial check to make sure the linked list isn't zero or one items long, precluding a cycle.)

<pre class="prettyprint lang-python">
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        if head == None or head.next == None:
            return False

        tortoise = head
        hare = head.next

        while tortoise != hare:
            if hare == None or hare.next == None:
                return False

            tortoise = tortoise.next
            hare = hare.next.next

        return True
</pre>

Predictably, we've sacrificed speed: this solution is faster than 54 percent of Python submissions. Now that we're not creating a dictionary, the memory situation is much improved: we've found our O(1) solution, but we're still near the bottom of LeetCode submissions, with better memory efficiency than just 28 percent of the pack.

As best as I can tell, though, everyone implementing this solution is using very nearly the same amount of memory. Make the variable names shorter, and you fly up the rankings. Just by replacing `tortoise` with `a` and `hare` with `b`, we achieve better memory efficiency than 88 percent of submissions.

As with most things that get names, Floyd's Tortoise and Hare is good for more than just solving LeetCode problems. One example is checking the quality of pseudorandom number generators: the longer the cycle, the closer to random the result, making it better for cryptographic applications. Here's some <a href="https://en.wikipedia.org/wiki/Cycle_detection" target="\_blank" rel="noopener noreferrer">Wikipedia goodness</a> if you'd like to learn more.
