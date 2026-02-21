import { useState, useEffect } from "react";
import { getCandidateInfo } from "./services/candidateService";
import { getPositions } from "./services/positionService";
import PositionItem from "./components/PositionItem";
import type { Candidate } from "./types/candidate";
import type { Position } from "./types/position";
import type { ErrorState } from "./types/error";

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [candidateInfo, setCandidateInfo] = useState<Candidate | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [errors, setErrors] = useState<ErrorState>({
    candidate: null,
    positions: null,
  });

  const fetchCandidate = async () => {
    try {
      const email = "mdiaconchuk@gmail.com";
      const data = await getCandidateInfo(email);
      setCandidateInfo(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        candidate: "Candidate not found.",
      }));
    }
  };

  const fetchPositions = async () => {
    try {
      const data = await getPositions();
      setPositions(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        positions: "Positions not found.",
      }));
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await Promise.all([fetchCandidate(), fetchPositions()]);
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <main>
      <div
        className="border border-neutral-500 rounded-xl shadow-lg p-4 w-11/12 h-8/12 md:w-7/12 md:p-12
       absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden"
      >
        {isLoading && (
          <p className="absolute top-5 text-md font-semibold">Loading...</p>
        )}

        {/* Check if candidate info is ok and render the first name */}
        {errors.candidate ? (
          <p className="text-red-500">{errors.candidate}</p>
        ) : (
          candidateInfo && (
            <p className="text-lg text-blue-300">
              ¡Hello, {candidateInfo?.firstName}!
            </p>
          )
        )}

        {/* Check if positions are ok and maps the positions array */}
        {errors.positions ? (
          <p className="text-red-500">{errors.positions}</p>
        ) : (
          /* If positions is not empty, render the position list */
          candidateInfo &&
          positions.length > 0 && (
            <div className="mt-6 overflow-y-auto grid grid-cols-2 gap-x-3 max-h-120 rounded-lg">
              {positions.map((pos) => (
                <PositionItem
                  key={pos.id}
                  title={pos.title}
                  jobId={pos.id}
                  uuid={candidateInfo.uuid}
                  candidateId={candidateInfo.candidateId}
                />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
}

export default App;
