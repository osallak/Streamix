import { Container, Stack, Toolbar, Typography } from "@mui/material";

export default function NoDataFound({ query }: { query: string }) {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Toolbar />
      <Stack spacing={2}>
        <Typography
          sx={{
            color: "primary.main",
            fontFamily: "Inter",
            fontSize: "1.1rem",
          }}
          variant="caption"
        >
          Your search for "{query}" did not have any matches.
        </Typography>
        <Stack>
          <Typography
            sx={{
              color: "primary.main",
              fontFamily: "Inter",
              fontSize: "1.1rem",
            }}
            variant="caption"
          >
            Suggestions:
          </Typography>
          <Stack sx={{ marginLeft: 3, mt: 1 }}>
            <Typography
              sx={{
                color: "primary.main",
                fontFamily: "Inter",
                fontSize: "1rem",
              }}
              variant="caption"
            >
              - Try different keywords
            </Typography>
            <Typography
              sx={{
                color: "primary.main",
                fontFamily: "Inter",
                fontSize: "1rem",
              }}
              variant="caption"
            >
              - Looking for a movie or TV show?
            </Typography>
            <Typography
              sx={{
                color: "primary.main",
                fontFamily: "Inter",
                fontSize: "1rem",
              }}
              variant="caption"
            >
              - Try using a movie, TV show title, an actor or director
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
