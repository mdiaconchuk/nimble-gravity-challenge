import type { PositionItemProps } from "../types/position";
import { postApplication } from "../services/applicateService";
import { useState,} from "react";

function PositionItem({ title, uuid, jobId, candidateId, applicationId }: PositionItemProps) {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!repoUrl.includes("github.com")) {
      alert("Please insert a repo.");
      return
    }
    setIsLoading(true);
    
    try {
      const apiResponse = await postApplication(uuid, jobId, candidateId, repoUrl, applicationId);
      if (apiResponse.ok) {
        alert("Application sent!");
        setRepoUrl("");
      }
    } catch (error) {
      alert(`Something failed! ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="border border-blue-400/25 bg-neutral-500/5 rounded-lg mt-3 p-5 md:p-8 flex flex-col gap-y-3 justify-center"
      onSubmit={handleSubmit}
    >
      <p className="font-semibold text-md md:text-lg text-neutral-300">
        {title}
      </p>

      <input
        type="url"
        required
        className="border border-blue-700 w-full md:w-9/12 p-2  shadow-md rounded-lg text-sm"
        placeholder="https://github.com/..."
        value={repoUrl ?? ""}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button
        className={`py-2 w-full md:w-9/12 shadow-md rounded-lg transition-color duration-200
        ${isLoading ? "cursor-not-allowed bg-neutral-600" : "bg-blue-700 hover:bg-blue-900"}`}
        type="submit"
      >
        {isLoading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}

export default PositionItem;
