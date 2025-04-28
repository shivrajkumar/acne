import { usePathname } from "next/navigation";

function useCustomRouter() {
  const pathname = usePathname();

  return { pathname };
}

export default useCustomRouter;
