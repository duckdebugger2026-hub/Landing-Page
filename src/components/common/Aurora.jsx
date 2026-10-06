// Three large, soft colour glows that drift slowly behind the page, all the
// time. Only their position moves, so the GPU can drift them without repainting.
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <span className="aurora-blob aurora-1" />
      <span className="aurora-blob aurora-2" />
      <span className="aurora-blob aurora-3" />
    </div>
  )
}
