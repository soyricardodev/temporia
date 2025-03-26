import { GithubIcon } from "./github-icon";

export function Footer() {
  return (
    <div className="mt-auto">
      <p className="font-light text-sm">Creado por <a href="https://github.com/soyricardodev" className="hover:underline font-medium inline-flex items-center gap-1">Ricardo Castro <GithubIcon className="size-4" /></a></p>
    </div>
  )
}