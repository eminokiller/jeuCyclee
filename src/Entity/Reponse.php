<?php

namespace App\Entity;

use App\Repository\ReponseRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ReponseRepository::class)
 */
class Reponse extends EntityRef
{
    /**
     *
     * @ORM\ManyToOne(targetEntity=Question::class, inversedBy="reponses",  cascade={"persist", "remove"})
     */
    private $question;

    /**
     * @Groups({"survey"})
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $status;


    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status): self
    {
        $this->status = $status;

        return $this;
    }
}
