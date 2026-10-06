import { mockupThemes } from "@/data/mockupThemes"
import { cn } from "@/lib/utils"

export default function Artwork({ theme, className }) {
  const t = mockupThemes[theme]
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
    >
      <span className="absolute top-[16%] left-[16%] aspect-square w-[30%] rounded-full bg-white/35" />
      <span className="absolute -right-[14%] -bottom-[30%] aspect-square w-[72%] rounded-full bg-white/20" />
    </div>
  )
}
