<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=QuestionRepository::class)
 */
class Question extends EntityRef
{
    /**
     * @Groups({"survey"})
     * @ORM\OneToMany(targetEntity=Reponse::class, mappedBy="question", cascade={"persist", "remove"})
     */
    private $reponses;

    /**
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="questions")
     */
    private $task;

    /**
     * @ORM\ManyToOne(targetEntity=Admin::class, inversedBy="questions")
     */
    private $owner;

    public function __construct()
    {
        $this->reponses = new ArrayCollection();
    }

    /**
     * @return Collection|Reponse[]
     */
    public function getReponses(): Collection
    {
        return $this->reponses;
    }

    public function addReponse(Reponse $reponse): self
    {
        if (!$this->reponses->contains($reponse)) {
            $this->reponses[] = $reponse;
            $reponse->setQuestion($this);
        }

        return $this;
    }

    public function removeReponse(Reponse $reponse): self
    {
        if ($this->reponses->removeElement($reponse)) {
            // set the owning side to null (unless already changed)
            if ($reponse->getQuestion() === $this) {
                $reponse->setQuestion(null);
            }
        }

        return $this;
    }

    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(?Task $task): self
    {
        $this->task = $task;

        return $this;
    }

    public function getOwner(): ?Admin
    {
        return $this->owner;
    }

    public function setOwner(?Admin $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
