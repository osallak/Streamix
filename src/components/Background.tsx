import bg from "@/assets/imgs/bg.jpg"; // You'll need to add this image

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, .8),rgba(0, 0, 0, .4), rgba(0, 0, 0, .8)), url('/assets/imgs/bg.jpg')`,
        }}
      />
    </div>
  );
}
