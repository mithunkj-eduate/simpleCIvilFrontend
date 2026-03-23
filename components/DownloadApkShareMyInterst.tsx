const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/apk/ShareUrImage.apk";
  link.download = "shareurimage.apk";
  link.click();
};

export default function DownloadApkShareMyInterst() {
  return (
    <button
      onClick={handleDownload}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
    >
      Download APK
    </button>
  );
}
