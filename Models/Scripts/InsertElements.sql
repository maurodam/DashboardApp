/*
    Script per inserire 5 elementi nella tabella dbo.Elements che genera i riquadri a video.
    Possono avere qualsiasi nome.
*/

MERGE INTO dbo.Elements tgt
USING (
    VALUES 
        ('element1'),
        ('element2'),
        ('element3'),
        ('element4'),
        ('element5')
) AS src (Name)
ON tgt.Name = src.Name
WHEN MATCHED THEN
    UPDATE SET
        tgt.Name = src.Name
WHEN NOT MATCHED THEN
    INSERT (Name)
    VALUES (src.Name);