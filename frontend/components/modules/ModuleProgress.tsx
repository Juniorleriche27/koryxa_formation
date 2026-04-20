interface ModuleProgressProps {
  completed: boolean;
  onComplete: () => void;
}

export default function ModuleProgress({ completed, onComplete }: ModuleProgressProps) {
  if (completed) {
    return (
      <div className="flex items-center gap-2 text-green-600 font-semibold text-lg">
        ✓ Module terminé
      </div>
    );
  }

  return (
    <button
      onClick={onComplete}
      className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-700 transition"
    >
      Marquer comme terminé
    </button>
  );
}
