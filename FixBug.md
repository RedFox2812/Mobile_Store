🛠️ FixBug.md - Common Error Solutions Guide !!
During the setup or execution of the Mobile Store project, if you encounter any of the following errors, follow the provided solutions to resolve them.

❗️Error 1: cannot import name 'is_sequence' from 'tensorflow.python.util.nest'
🔍 Cause: Internal changes in recent TensorFlow versions have made tflearn incompatible.

✅ Solution: Uninstall the current version of tflearn and install a patched version:

pip uninstall tflearn
pip install git+https://github.com/MihaMarkic/tflearn.git@fix/is_sequence_missing

❗️Error 2: AttributeError: module 'PIL.Image' has no attribute 'ANTIALIAS'
🔍 Cause: Newer versions of Pillow have removed the Image.ANTIALIAS attribute.

✅ Solution: Downgrade Pillow to a compatible version:

pip uninstall Pillow
pip install Pillow==9.5.0

💬 Still Facing Issues?
If you encounter other errors not listed above, feel free to open an issue on GitHub or contact the development team for further assistance.