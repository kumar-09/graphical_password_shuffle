import os

# replace with your directory path
directory = "D:\\IITB\\IDC\\graphical-password\\src\\assets\\Celeb6"
files = os.listdir(directory)

for i, filename in enumerate(files, 1):
    # create the new filename with sequential number
    new_filename = f"{i}.jpg"  # replace ".jpg" with your file extension

    # rename the file
    os.rename(os.path.join(directory, filename),
              os.path.join(directory, new_filename))
