/* helper function - designed to perform subsidiary tasks that support the primary function or process
utility function -  provide general purpose functionality that can be reused across different parts of an application or even 
                    across different projects
Remotes
Pointers
Changing Git History 
***have to learn a disciplined Git workflow 

History-changing Git commands
- How to change my most recent commit
    git add test4.md - update the staging area to include the missing file 
    git commit --amend - replace the last commit with the new one to include the missing file
                         use this when I commit too early or when I mess up my commit message
    ONLY AMEND COMMITS THAT HAVE NOT BEEN PUSHED ANYWHERE, i.e. only amend commits that are still local
    git commit --amend - does not edit the last commit, it replaces that commit with an entirely new one, which means I could 
        potentially destroy a commit other devs are basing their work on 
- How to change multiple commit messages
    git rebase -i - allows me to interactively stop after each commit I'm trying to modify and then make whatever changes I wish
                    I do have to tell the command which is the last commit I want to edit
    rebase - process in version control systems, where I move ro combine a sequence of commits to a new base commit 
             it takes the commits from my current branch and replays them on top of another branch, 
             effectively changing the base commit of my branch
    git rebase -i HEAD~2 - allows me to edit the last two commits 
HEAD - pointer or reference to the current commit in the repo, represents my current working state
        when rebasing, commits are listed in opposite order
***if I have to rebase commits in a shared repo, make sure I'm doing so for a good reason that colleagues are aware of
    git log
    git rebase -i HEAD~2 (have to tell the command which is the last commit I want to edit)
    (save and exit editor)
    git commit --amend
    (fix the commit)
    git commit rebase --continue
- How to reorder commits
  when rebasing - change the position of a commit in the list
- How to squash commits together
  squash - often done when a feature is merged onto a main branch
- How to split up commits 
  git reset HEAD^ (resets the commit to the one right before HEAD, allowing me to add files individually and commit them individually)
  (git reset - resets the current branch by pointing HEAD at the commit right before it
               it also updates the index/staging area with the contents of wherever HEAD is now pointed
               so the staging area was also reset to what was at the prior commit)
    if I want to move where HEAD points to but don't want to touch the staging area
    if I want to leave the index alone, I can use 
Different ways of changing history
   git reset --soft - only performs the first part of git reset where the HEAD is moved to point somewhere else
                     allows me to go back multiple commits and combine all the changes included in them into one commit 
   git reset --hard - performs all the steps of git reset, moving the HEAD, updating the index, and also updates the working directory
                     a hard reset overwrites files in the working directory to make it look exactly like the staging area of wherever 
                     HEAD ends up pointing to
   git commit -amend and git reset --hard are destructive commands which overwrite history
- How can I amend my last commit?
  git commit -amend
- What are some different ways to rewrite history?
Using remotes to change history
Dangers of history-changing operations
Best practices of history-changing operations
Pointers
- Explain what it means for branches to be pointers
  git add - stages file contents
  git commit - is a snapshot of all the file contents, i.e. my entire tracked workspace gets copied
  branch - pointer to a single commit, a commit is a snapshot and a spointer to the commit directly behind it
  each commit is a commit, but also a pointer that points to the commit that came before it 
  git rebase -i HEAD~2 - HEAD is a special pointer to the current commit, and keeps track of the branch I'm currently on
                         HEAD points to the most recent commit in the current branch 
                         that most recent commit points to the commit made directly before it, commit two 
merge - process of integrating changes from one branch into another
        creates a new commit called a merge commit that has two parent commits, representing the joining of branch histories
        how it's done: 
        1. performs a three-way merge between the latest branch snapshots and the most recent ancestor of the two
        2. creating a new snapshot and commit
    merging takes the endpoints and merges them together 
rebase - moves, or re-applies a series of commits from one branch onto another, rewriting the commit history by creating new 
        commits for each commit in the original branch
        1. goes to the common ancestor of the two branches
        2. get the differences introduced by each commit of the branch I'm on
        3. save those differences to temporary files
        4. reset the current branch to the same commit as the branch I am rebasing into 
        5. apply each change in turn
    git checkout experiment
    git rebase master
    First, rewinding head to replay my work on top of it...
    Applying: added staged command
    rebasing replays changes from one line of work onto another in the order the changes were introduced
there is no difference in the end product of the integration, but rebasing makes for a cleaner history
I would rebase to make sure my commits apply cleanly on a remote branch- perhaps in a project to which I'm trying to 
contribute but which I don't maintain

I can have my rebase replay on something other than the rebase target branch 
ex. I branched a topic branch (server) to add some server-side functionality and made a commit
    then I branched off that topic branch to make the client-side changes (client) and committed a few times
    then I went back to my server branch and did a few more commits 

    What if I want to merge my client-side changes into the mainline for a release, but I want to hold off on the server-side changes
    until they're tested further?
    I can take the changes on client that aren't on server, and replay them on my master branch by using --onto option of git rebase
    git rebase --onto master server client
    Take the client branch, figure out the patches since it diverged from the server branch, and replay those patches in the client branch
    as if it was based directly off the master branch instead

    fast-forward merge - merge operation that occurs when the branch I am merging has not diverged from the branch I am merging into
    
    if I decide then to pull in my server branch as well, I can rebase the server branch onto the master branch 
    git rebase master server
    this will check out the topic branch (server), and replay it onto the base branch (master)
    then I can fast-forward the base branch
    git branch -d client
    git branch -d server
    I can remove the client and server branches because all the work is integrated and I don't need them anymore

Perils of Rebasing 
I should not rebase commits that exist outside my repository and that people have based their work on 

if I pull down work that was rewritten and rebase it on top of the new commits from my partner, Git can often successfully figure out
what is uniquely mine and apply them back on top of the new branch

Git as a system manages and manipulates three trees in its normal operation
HEAD - last commit snapshot, parent of the net commit
       pointer to the current branch reference
       the current branch reference is a pointer to the last commit made on that branch
Index - proposed next commit snapshot
        the index is the same as Git's staging area
        Git populates this index with a list of the file contents that were last checked out into my working directory
            and what they looked like when they were originally checked out
            I then replace some of those files with new versions of them 
        git commit converts that into the tree for a new commit 
Working Directory - sandbox
                    the HEAD and Index store their content inside the .git folder
                    working directory unpacks content into actual files
                    where I can try out changes before commiting them to my staging area/index and then to history

Git uses SHA-1 hashes to identify commits, trees, and blobs uniquely, each commit is identified by a SHA-1 hash

The Workflow
from HEAD to Working Directory: Checkout the project
from Working Directory to Index: Stage files
from Indx to HEAD: Commit

Git records snapshots of my project in successively better states
I go into a new directory with a single file in it. 
I call the this v1 of the file.
Run git init - creates a Git repository with a HEAD reference which points to the unborn master branch

at this point, only the working directory tree has any content...

git add - I want to take content in the working directory and copy it to the index

git commit - takes contents of the index and saves it as a permanent snapshot, 
             creates a commit object which points to that snapshot, 
             updates master to point to that commit

if I want to make changes to the file and commit it, go through the same process...
change the file in my working directory
call it v2 of the file

git status - file will be in red, because the entry differs between the index and the working directory
git add - stages it into my index
git status - changes to be committed because the index and HEAD differ
git commit - finalize the proposed next commit 
git status - no output, because all three trees are the same again

switching branches or cloning is similar
when I check out a branch, it changes HEAD to point to the new branch reference, 
populates my index with the snapshot of that commit,
copies the contents of the index into my working directory

reset manipulates the three trees, HEAD, Index, and Working Directory in 3 basic operations:
1. move HEAD - reset moves what HEAD points to
               (checkout changes HEAD itself)
               reset moves the branch that HEAD is pointing to
               with git reset --soft, the rest stops here
              here, git reset essentially undoes the last git commit , moving the branch abck to where it was
                without changing the index or working directory
              now I can update the index and run git commit to accomplish the same thing as git commit --amend
2. update the Index (--mixed) HEAD~ - reset will update the index with the contents of whatever snapshot HEAD now points to
                      --mixed option, reset will stop at this point
                     this command undoes my last commit and also unstaged everything,
                     rolling back to before I ran all my git add and git commit commands
3. update the working directory (--hard) - make the working directory look like the index
                                undoes the last commit, the git add, and git commit commands, and all the work I did in my working directory 
                                ***this is one of the few cases where Git will actually destroy data
                                files in my working directory are forcibly overwritten
                                I still have the v3 version of my file in a commit in my Git DB 

reset can be provided with a path to act upon
if I specify a path, reset skips step 1 and limits the remainder of its actions to a specific file or set of files
git reset file.txt (same as git reset --mixed HEAD file.txt) - 1. move the branch HEAD points to
                                                               2. makes the index look like HEAD
    this has the practical effect of unstaging the file, the exact opposite of git add 
could specify a specific commit to pull the file version from (git reset eb43bf file.txt)
    this would be a soft reset with a path to a specific commit 

reset command will accept a --patch option to unstage content on a hunk-by-hunk basis 
    I can selectively unstage or revert content

reset can quickly and easily squash irrelevant multiple commits into a single commit
git reset --soft HEAD~2 - move the HEAD branch back to an older commit (the most recent commit I want to keep)
                          moves HEAD with soft reset
                          simply run git commit again
                          now my reachable history, the history I would push, now looks like I had one commit with file-a.txt v1, 
                          and a second that both modified file-a.txt to v3 and added file-b.txt
                          the commit with the v2 version will no longer be in the history

checkout is like reset, it manipulates the three trees
without paths
git checkout [branch] - updates all three trees to look like [branch]
                        checkout is working-directory safe
                        it will check to make sure it's not blowing away files that have changes to them
                        it tries to do a merge in the working directory, so all of the files I haven't changed will be updated
                        (reset moves the branch that HEAD points to)
                        checkout moves HEAD itself to point to another branch
git reset master - [developbranch] will now point to the same commit that master does
                   reset moves the branch HEAD points to 
git checkout master - [developbranch] does not move, HEAD itself does and will now point to master
                      checkout moves the HEAD itself

with paths 
git checkout [file] - like reset, does not move HEAD
                      (works just like git reset [branch] file)
                      updates the index with that file at that commit
                      also overwrites the file in the working directory
                      it's not working-directory sage and it does not move HEAD
                      checkout will accept a --patch option to allow me to selectively revert file contents on a hunk by hunk basis

git stash - temporarily saves changes in my working directory that I am not ready to commit yet
            allows me to switch branches or perform other tasks without losing my uncommitted changes

git rebase --abort - repo will be returned to the state it was before I started the rebase

git reflog - if I finish a rebase and decide it's not what I want, this recovers an earlier version of my branch

Working with Remotes
Using remotes to change history
Dangers of history-changing operations
Best practices of history-changing operations

git push --force
 
*/
