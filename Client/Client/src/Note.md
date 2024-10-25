To push your changes from your branch to the main branch after updating your part, here’s a step-by-step guide:

# 1. Pull the latest changes from the main branch

       git checkout main
       git pull origin main

# 2. Switch back to your branch

       git checkout your-branch-name

# 3. Merge the latest changes from the main branch into your branch:

     git merge main

# 4. Resolve merge conflicts (if any)

      git add <file-name>
      git commit

# 5. Push your branch to the remote:

     git push origin your-branch-name

# 6. Create a Pull Request (PR) to the main branch

      - In GitHub, click on "Compare & Pull Request."
      - Provide a title and description for the PR, explaining the changes you made.

# 7. Merge your PR into main (if allowed):

      -   Go to your Pull Request on GitHub (or your Git platform).
      -   Finally Click on "Merge Pull Request."
      -   Optionally, delete your branch after merging if it's no longer needed.

# 8. Optional: Delete your local branch:

     git branch -d your-branch-name
